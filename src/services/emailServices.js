export const emailServices = ()=> {
    send:async(to, subject, mesage)=> {
        console.log(`[emailServices] Enviado e-mail para: ${to}`);
        console.log(`Assunto: ${subject}`);
        console.log(`Mensagem: ${mesage}`);
        return true;
    }
}