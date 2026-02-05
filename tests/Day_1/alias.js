function invokeBrowser(paymentMethod) {
    if (paymentMethod === "UPI") {
        console.log("UPI Selected");
    }
    else if (paymentMethod === "Creditcard") {
        console.log("Creditcard Selected");
    }
    else {
        console.log("PayPal Selected");
    }
}
invokeBrowser("UPI");
invokeBrowser("Creditcard");
