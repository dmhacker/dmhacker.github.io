
// READING ANALYTICS ALGORITHM

function entry() {
    algorithm($("#submitarea").val());
}

function algorithm(text) {
    var wordsToSentences = wordCount(text) / sentenceCount(text);
    var syllablesToWords = syllableCount(text) / wordCount(text);
    // Flesch Kincaid readability
    var ease = Math.round(206.835 - 1.015 * wordsToSentences - 84.6 * syllablesToWords);
    var gradeLevel = Math.round(0.39 * wordsToSentences + 11.8 * syllablesToWords - 15.59);
    display(ease, gradeLevel);
}

function display(ease, gradeLevel) {
    $("#statsGradeLevel").text("Grade level: "+gradeLevel);
    $("#statsEase").text("Ease of reading: "+ease);

    var easeDesc = "Very complicated and confusing."
    if (ease > 30 && ease <= 60) {
        easeDesc = "Difficult."
    }
    else if (ease > 60 && ease <= 70) {
        easeDesc = "Standard."
    }
    else if (ease > 70 && ease <= 90) {
        easeDesc = "Easy."
    }
    else if (ease > 90) {
        eascDesc = "Super easy!"
    }

    $("#statsEaseDesc").text(easeDesc);
}

function sentenceCount(str) {
   return str.split(/[.|!|?]\s/gi).length;
}

function wordCount(s){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    return s.split(' ').length;
}

function syllableCount(word) {
    word = word.toLowerCase();                                     //word.downcase!
    if(word.length <= 3) { return 1; }                             //return 1 if word.length <= 3
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '');                                 //word.sub!(/^y/, '')
    return word.match(/[aeiouy]{1,2}/g).length;                    //word.scan(/[aeiouy]{1,2}/).size
}
