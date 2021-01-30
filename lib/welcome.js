const fs = require('fs-extra') // Modulo para leitura do welcome.json

module.exports = welcome = async (kill, event) => {
    const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json')) // Isso verifica se o grupo está na lista dos que vão usar o welcome
    const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await kill.getChatById(event.chat)
            const { contact, groupMetadata, name } = gChat
				await kill.sendTextWithMentions(event.chat, `Holaaaa @${event.who.replace('@c.us', '')}! 🥰 \n\nSea muy bienvenido a ${name} 😎 \n\nDeseo que te diviertas y que sigas nuestras reglas! ✅ \n\nSi es necesario, llame a un administrador o escriba /menu. 👨🏻‍💻 Dejame presentarme, soy Irís, un bot creado por Mau, espero caerte bien, y porfavor, *NO ME SATURES*🙂`)
			}
			// Acima é para caso alguém entre ou seja adicionado
			// Abaixo é para caso saia ou seja removido
		if (event.action == 'remove' && isWelkom) {
			const profile = await kill.getProfilePicFromServer(event.who)
			if (profile == '' || profile == undefined) profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
				await kill.sendFileFromUrl(event.chat, profile, 'profile.jpg', '')
				await kill.sendTextWithMentions(event.chat, `Jasdkjasd, el tarado de @${event.who.replace('@c.us', '')} se fue XDDDD \nPuta de mierda, ojalá no vuelva BvBvBv`)
			}
    } catch (err) {
        console.log(err)
    }
}
