var current = "Overall";
var overallReset = 0;
var game1Reset = 0;
var game2Reset = 0;

function pickMockStats (mockType) {
	var imageHolder = document.getElementById('statsImage');
	switch(mockType) {
		case "Overall":
			current = mockType;
			if(overallReset === 0) {
				imageHolder.src = "../../images/mockOverallStats.png";
			} else if(overallReset == 1) {
				imageHolder.src = "../../images/mockOverallStatsResetTimes.png";
			} else if(overallReset == 2) {
				imageHolder.src = "../../images/mockOverallStatsResetStats.png";
			} else if(overallReset == 3) {
				imageHolder.src = "../../images/mockOverallStatsResetBoth.png";
			}
			return;
		case "Game 1":
			current = mockType;
			if(game1Reset === 0) {
				imageHolder.src = "../../images/mockGame1Stats.png";
			} else if(game1Reset == 1) {
				imageHolder.src = "../../images/mockGame1StatsResetTimes.png";
			} else if(game1Reset == 2) {
				imageHolder.src = "../../images/mockGame1StatsResetStats.png";
			} else if(game1Reset == 3) {
				imageHolder.src = "../../images/mockGame1StatsResetBoth.png";
			}
			return;
		case "Game 2":
			current = mockType;
			if(game2Reset === 0) {
				imageHolder.src = "../../images/mockGame2Stats.png";
			} else if(game2Reset == 1) {
				imageHolder.src = "../../images/mockGame2StatsResetTimes.png";
			} else if(game2Reset == 2) {
				imageHolder.src = "../../images/mockGame2StatsResetStats.png";
			} else if(game2Reset == 3) {
				imageHolder.src = "../../images/mockGame2StatsResetBoth.png";
			}
			return;
		case "Reset Times":
			switch (current){
			case "Overall":
				if(overallReset >= 2) {
					overallReset = 3;
					imageHolder.src = "../../images/mockOverallStatsResetBoth.png";
				} else {
					overallReset = 1;
					imageHolder.src = "../../images/mockOverallStatsResetTimes.png";
				}
				return;
			case "Game 1":
				if(game1Reset >= 2) {
					game1Reset = 3;
					imageHolder.src = "../../images/mockGame1StatsResetBoth.png";
				} else {
					game1Reset = 1;
					imageHolder.src = "../../images/mockGame1StatsResetTimes.png";
				}
				return;
			case "Game 2":
				if(game2Reset >= 2) {
					game2Reset = 3;
					imageHolder.src = "../../images/mockGame2StatsResetBoth.png";
				} else {
					game2Reset = 1;
					imageHolder.src = "../../images/mockGame2StatsResetTimes.png";
				}
				return;
			}
			return;
		case "Reset Stats":
			switch (current){
			case "Overall":
				if(overallReset == 1 || overallReset == 3) {
					overallReset = 3;
					imageHolder.src = "../../images/mockOverallStatsResetBoth.png";
				} else {
					overallReset = 2;
					imageHolder.src = "../../images/mockOverallStatsResetStats.png";
				}
				return;
			case "Game 1":
				if(game1Reset == 1 || game1Reset == 3) {
					game1Reset = 3;
					imageHolder.src = "../../images/mockGame1StatsResetBoth.png";
				} else {
					game1Reset = 2;
					imageHolder.src = "../../images/mockGame1StatsResetStats.png";
				}
				return;
			case "Game 2":
				if(game2Reset == 1 || game2Reset == 3) {
					game1Reset = 3;
					imageHolder.src = "../../images/mockGame2StatsResetBoth.png";
				} else {
					game2Reset = 2;
					imageHolder.src = "../../images/mockGame2StatsResetStats.png";
				}
				return;
			}
			return;
	}
}















