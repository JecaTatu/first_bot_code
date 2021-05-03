process.env.LEAGUE_API_PLATFORM_ID = 'br1'

const Discord = require("discord.js");
const axios = require('axios')
const config = require("./config.json");
const client = new Discord.Client();

const LeagueJS = require('leaguejs');
const leagueJs = new LeagueJS(config.RITO_KEY);

const ritoBase = 'https://br1.api.riotgames.com';
const ritoSummoner = '/lol/summoner/v4/summoners/by-name/';

const nicks = ['alexfilh0', 'All All DOR ', 'AII AII PRAZER'];
const prefix = "!";

client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const server = message.guild.id;
    const guild = message.guild;

    if (command === "gabriell") {
        axios.get(ritoBase+ritoSummoner+`All%20All%20DOR?api_key=${config.RITO_KEY}`)
        .then( res => {
            message.reply("O nick é: "+ res.data.name)
            message.reply('O nível é: '+ res.data.summonerLevel)
        })
        .catch( error => {
            console.log(error.response.data);
        })
    }
    if (command === "may") {
        axios.get(ritoBase+ritoSummoner+`AII%20AII%20PRAZER?api_key=${config.RITO_KEY}`)
        .then( res => {
            leagueJs.Match.gettingListByAccount(res.data.accountId)
            .then(res => {
                mostRecentTime = new Date(Math.max.apply(null, res.matches.map( e => {
                    return new Date(e.timestamp);
                })))
                lastGame = res.matches.filter( e => {
                    var d = new Date( e.timestamp );
                    return d.getTime() == mostRecentTime.getTime();
                })[0];
                leagueJs.StaticData.gettingChampionById(lastGame.champion).then( champion => {
                    let champ = champion.name
                    game = leagueJs.Match.gettingById(lastGame.gameId).then(res => {
                        let duo = [];
                        res.participantIdentities.forEach(participant => {
                            if (nicks.includes(participant.player.summonerName) && participant.player.summonerName !== 'AII AII PRAZER') {
                                duo.push(participant.player.summonerName)
                            }
                        });
                        if (duo.length > 0) {
                            if(duo.length > 1) {
                            message.reply(`May estava jogando com ${duo[0]} e ${duo[1]} na ultima partida de ${champ}`)
                            }
                            else {
                                message.reply(`May estava jogando com ${duo[0]} na ultima partida de ${champ}`)
                            }
                        }
                        else {
                            message.reply(`May estava jogando sozinho na ultima partida de ${champ}`)
                        }
                    }
                );
            })
            .catch(e => console.log(e))
        });
        })
        .catch( error => {
            console.log(error.response.data);
        })
    }
    if (command === "alex") {
        axios.get(ritoBase+ritoSummoner+`alexfilh0?api_key=${config.RITO_KEY}`)
        .then( res => {
            leagueJs.Match.gettingListByAccount(res.data.accountId)
            .then(res => {
                mostRecentTime = new Date(Math.max.apply(null, res.matches.map( e => {
                    return new Date(e.timestamp);
                })))
                lastGame = res.matches.filter( e => {
                    var d = new Date( e.timestamp );
                    return d.getTime() == mostRecentTime.getTime();
                })[0];
                leagueJs.StaticData.gettingChampionById(lastGame.champion).then( champion => {
                    let champ = champion.name
                    game = leagueJs.Match.gettingById(lastGame.gameId).then(res => {
                        let duo = [];
                        res.participantIdentities.forEach(participant => {
                            if (nicks.includes(participant.player.summonerName) && participant.player.summonerName !== 'alexfilh0') {
                                duo.push(participant.player.summonerName)
                            }
                        });
                        if (duo.length > 0) {
                            if(duo.length > 1) {
                                message.reply(`Alex estava jogando com ${duo[0]} e ${duo[1]} na ultima partida de ${champ}`)
                            }
                            else {
                                message.reply(`Alex estava jogando com ${duo[0]} na ultima partida de ${champ}`)
                            }
                        }
                        else {
                            message.reply(`Alex estava jogando sozinho na ultima partida de ${champ}`)
                        }
                    });
                })
                .catch(e => console.log(e))
            });
        })
        .catch( error => {
            console.log(error.response.data);
        })
    }
    if (command === "gabriel") {
        axios.get(ritoBase+ritoSummoner+`All%20All%20DOR?api_key=${config.RITO_KEY}`)
        .then( res => {
            leagueJs.Match.gettingListByAccount(res.data.accountId)
            .then(res => {
                mostRecentTime = new Date(Math.max.apply(null, res.matches.map( e => {
                    return new Date(e.timestamp);
                })))
                lastGame = res.matches.filter( e => {
                    var d = new Date( e.timestamp );
                    return d.getTime() == mostRecentTime.getTime();
                })[0];
                leagueJs.StaticData.gettingChampionById(lastGame.champion).then( champion => {
                    let champ = champion.name
                    game = leagueJs.Match.gettingById(lastGame.gameId).then(res => {
                        let duo = [];
                        res.participantIdentities.forEach(participant => {
                            if (nicks.includes(participant.player.summonerName) && participant.player.summonerName !== 'All All DOR ') {
                                duo.push(participant.player.summonerName)
                            }
                        });
                        if (duo.length > 0) {
                            if(duo.length > 1) {
                                message.reply(`estava jogando com ${duo[0]} e ${duo[1]} na ultima partida de ${champ}`)
                            }
                            else {
                                message.reply(`estava jogando com ${duo[0]} na ultima partida de ${champ}`)
                            }
                        }
                        else {
                            message.reply(`estava jogando sozinho na ultima partida de ${champ}`)
                        }
                    });
                })
                .catch(e => console.log(e))
            });
        })
        .catch( error => {
            console.log(error.response.data);
        })
        // const list = client.guilds.cache.get(server)
        // list.members.cache.each(member => {
        //     message.reply(`<@${member.user.id}>`).catch( error => console.log(error))

        // });
    }
    if (command === "translate") {
        text = commandBody.substr(commandBody.indexOf(' ')+1);
        console.log(text)
        axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
            params:{
                q: text,
                target: "en",
                key: config.GOOGLE_KEY
            }
        })
        .then( res => {
            message.reply(res.data.data.translations[0].translatedText)
            .catch(error => console.log(error));
        })
        .catch( error => {
            console.log(error);
        })
    }
    if (command === "passeio") {
        message.reply("o pau na sua cara");
    }
});

client.login(config.BOT_TOKEN)
.catch( error => {
    console.log(error)
});
