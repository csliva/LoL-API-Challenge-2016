import requests, json, psycopg2,time
#Enter database Information
dbname = "riotdb"
user = "postgres"
password = "spitfire7*"
table = "challengers"

#Ask to enter API key 
api_key = raw_input("Please enter Riot API key: ")

#Pull from challenger list, which has 200 players
playerListUrl = "https://na.api.pvp.net/api/lol/na/v2.5/league/challenger?type=RANKED_SOLO_5x5&api_key=" + api_key
listResponse = requests.get(playerListUrl, timeout=20)
#playerListData holds our JSON. 1 call for all 200 player Ids
playerListData = listResponse.json()

try:
    conn = psycopg2.connect("dbname='" + dbname + "' user='" + user + "' host='localhost' password='" + password + "'")
    print "Successfully connected!"
except:
    print "Failed to connect to database. Check authentication."

cur = conn.cursor() #cursor can execute SQL commands. If connection fails, conn is not defined!

cur.execute("DROP TABLE " + table)

cur.execute("CREATE TABLE IF NOT EXISTS " + table + "(tablekey FLOAT, playerId INT, playerRank VARCHAR, championId INT, championName VARCHAR, championRole VARCHAR, championPoints INT, championLevel INT, playerWins INT, playerLosses INT);")

#Rate limiting logic, uses time library
def RateLimited(maxPerSecond):
    minInterval = 1.0 / float(maxPerSecond)
    def decorate(func):
        lastTimeCalled = [0.0]
        def rateLimitedFunction(*args,**kargs):
            elapsed = time.clock() - lastTimeCalled[0]
            leftToWait = minInterval - elapsed
            if leftToWait>0:
                time.sleep(leftToWait)
            ret = func(*args,**kargs)
            lastTimeCalled[0] = time.clock()
            return ret
        return rateLimitedFunction
    return decorate

@RateLimited(1)  #  About one call every 2 seconds at most
def rateLimitUrl(currUrl): 
    urlResponse = requests.get(currUrl, timeout=20)
    urlData = urlResponse.json()
    print "Getting rate limited data from URL: " + currUrl
    return urlData

def quickDataGrab(currUrl):
    urlResponse = requests.get(currUrl, timeout=20)
    urlData = urlResponse.json()
    return urlData

if __name__ == "__main__":
    listlength = len(playerListData["entries"])-1
    for i in range(0, listlength):
        #this section mainly grabs all API calls
        playerId = playerListData["entries"][i]["playerOrTeamId"]
        masteryUrl = "https://na.api.pvp.net/championmastery/location/NA1/player/" + playerId + "/champions?api_key=" + api_key
        masteryData = rateLimitUrl(masteryUrl)
        masteryLength = len(masteryData)-1
        #next, get player data such as wins and losses on this champ
        playerChampDataUrl = 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/' + playerId + '/ranked?season=SEASON2016&api_key=' + api_key
        playerChampData = rateLimitUrl(playerChampDataUrl)
        for j in range(0, masteryLength):
            tablekey = str(masteryData[j]["playerId"]) + str(j) + str(masteryData[j]["championPoints"])
            playerId = str(masteryData[j]["playerId"])
            playerRank = str(playerListData["tier"]) 
            championId = str(masteryData[j]["championId"])
            championPoints = str(masteryData[j]["championPoints"])
            championLevel = str(masteryData[j]["championLevel"])
            #quickly grab the static data
            championDataUrl = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + championId + "?champData=tags&api_key=" + api_key
            try:
                championData = quickDataGrab(championDataUrl)
	    except Exception,e:
	        print str(e)
            championName = str(championData["name"]).replace("'", "")
            championRole = str(championData["tags"][0])
            playerWins = '0'
            playerLosses = '0'
            playerChampDataLength = len(playerChampData["champions"])-1
	    for k in range(0 , playerChampDataLength):
                if str(playerChampData["champions"][k]["id"]) == championId:
            	    playerWins = str(playerChampData["champions"][k]["stats"]["totalSessionsWon"])
            	    playerLosses = str(playerChampData["champions"][k]["stats"]["totalSessionsLost"])
	            try: 
                        print "playerWins = " + playerWins 
            	        cur.execute("INSERT INTO " + table +" VALUES (" + tablekey + ", " + playerId + ", \'" + playerRank + "\', " + championId + ", \'" + championName + "\', \'" + championRole + "\', " + championPoints + ", " + championLevel + ", " + playerWins + ", " + playerLosses + ");")
            	        print "Row added for: " + str(playerId)
             	        conn.commit()
	            except Exception,e:
	 	        print str(e)
