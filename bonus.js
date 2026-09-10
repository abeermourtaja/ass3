var longestCommonPrefix = function(strs) {
    if(strs.length==0)
        return "";
    for(let i=0;i<strs.length;i++){
        for(let j=0;j<strs[i].length;j++){
            if(strs[0][j]!==strs[i][j]){
                return strs[0].substring(0,j);
            }   
            else return "";
        }
    }
};
console.log(longestCommonPrefix(["flower","flow","flight"]));