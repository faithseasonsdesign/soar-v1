

const registerUser = async (req,res)=>{
    const {graduateInformation} = req.body;
    console.log(`Graduate Information : `,graduateInformation);
}

module.exports = {
    registerUser,
}