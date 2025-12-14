const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp conectado com sucesso!');
});

client.on('message', msg => {
    if (
        msg.body &&
        /(oi|ola|olá|informação|informacoes|quero|comprar|site|link)/i.test(msg.body)
    ) {
        client.sendMessage(
            msg.from,
            'Olá 👋\n\n' +
            'Aqui é o *Macson*, representante oficial do *Trans Resveratrol Americano*.\n\n' +
            'Acesse o site oficial:\n\n' +
            'https://rebrand.ly/Trans-ReveraPromo'
        );
    }
});

client.initialize();

