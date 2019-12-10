module.exports = (top) => {
        let spielfeld = document.getElementById("spielfeld");
        if (top){
            return spielfeld.offsetHeight;
        } else {
            return spielfeld.offsetWidth;
        }
}