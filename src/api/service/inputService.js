const Validate = async (Data, NeddedObj) => {
    let Data_Obj = Object.keys(Data)
    let InputValue

    if (!Array.isArray(NeddedObj)) {
        return { res: false }
    } else {

        NeddedObj.forEach(element => {
            if (!Data_Obj.includes(element))
                InputValue = element
        })

        if (!InputValue) {
            return { res: true };
        } else {
            return { res: false };
        }
    }
}

module.exports = {Validate}