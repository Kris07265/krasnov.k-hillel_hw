'use strict';
const user = {
    name: "John",
    age: Number("20"),
    email: "john@gmail.com",
    isSubscribed: true,
    balance: "150.25",
    verified: 1
}
const {name,age, email, isSubscribed, balance, verified} = user;
let numberBalance = Number(balance);
let booleanVerified = Boolean(verified === 1);
let userOk = Boolean(age >= 18 && booleanVerified && ( isSubscribed || numberBalance > 0));
if (age < 18){
    userOk = "Access restricted due to age";
}
const ageCompareDouble = (age == 20);
const ageCompareTriple = (age === 20);
console.log(userOk);
console.log(ageCompareDouble);
console.log(ageCompareTriple);



const order = {
    total: "1200",
    currency: "dollar",
    isPaid: true,
    delivery: "yes",
    priority: "1"
}
const {total, currency, isPaid, delivery, priority} = order;
let numberTotal = Number(total);
let booleanDelivery = Boolean(delivery === "yes");
let booleanPriority = Boolean(priority === "1");
if (isPaid === false) {
    console.log("Order is not paid");
}
else if (isPaid === true && numberTotal >= 1000) {
    console.log("High-value paid order");
}
else if (isPaid === true && booleanDelivery === true) {
    console.log("Paid order with delivery");
}
else if (isPaid === true && booleanDelivery === false) {
    console.log("Paid order without delivery");
}
if (booleanPriority) {
    console.log(" [PRIORITY]");
}
const totalCompareDouble = (total == numberTotal);
const totalCompareTriple = (total === numberTotal);
console.log(totalCompareDouble);
console.log(totalCompareTriple);
let orderOk = Boolean(isPaid || numberBalance >= numberTotal);



const systemSettings = {
    darkMode: true,
    fontSize: "18",
    language: "en",
    betaAccess: "true"
}
const {darkMode, fontSize, language, betaAccess} = systemSettings;
let numberFontSize = Number(fontSize);
let booleanBetaAccess = Boolean(betaAccess);
let isLargeFont = (numberFontSize >= 18);
if (darkMode && isLargeFont){
    console.log("Dark mode + large font");
}
else if (darkMode){
    console.log("Dark mode");
}
else if (isLargeFont){
    console.log("Large font");
}
else {
    console.log("Default settings");
}
if (booleanBetaAccess) {
    console.log("(Beta tester)");
}
let systemSettingsOk = Boolean(numberFontSize > 12 && (language === "en" || language === "uk"));



let finalAccess = Boolean(userOk && orderOk && systemSettingsOk);
let errorReason = null;
if (!userOk){
    errorReason = "User denied";
}
else if (!orderOk){
    errorReason = "Order denied";
}
else if (!systemSettingsOk){
    errorReason = "System settings denied";
}
if (finalAccess) {
    console.log("Full access granted");
}
else {
    console.log("Access denied");
    console.log(errorReason);
}
