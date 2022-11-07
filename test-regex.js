



//console.log(folliclesRegex.exec(testString1));
//console.log(folliclesRegex.exec(testString1));

// Regex 1


// If regex 1 matches: check for 'and' -> assimilates as comma delimiter
// remove 'mm'
// parse by comma and round then to string -> these are the follicle data
function case1() {
    const testString1 = '23.5, 12.8, 8.4; 11.9; 8, 5; 5, 5, 25,25,25,16, 14, 14 and 7 mm';
    // If it didnt go through the case2 and case3 regex, try this
    const tmp = testString1.replaceAll('and', ',');
    const tmp2 = tmp.replace(/\s/g, '');
    const tmp3 = tmp2.replaceAll('mm', '');
    const tmp4 = tmp3.replaceAll(';', ',');
    const sizeList = tmp4.split(',');
    sizeList.map(element => parseFloat(element));
    return sizeList;
}

// Sample format: '16.6 x 10.9 x 8.1 mm 16.6 x 10.9 x 8.1 mm 16.6 x 10.9 x 8.1 mm'
// Objective: For each follicle (which can have n numbers) ... should end with mm / no x anymore
// Get all the numbers, and take the average -> its the average size of the follicle
function case2() {
    const folliclesRegex2 = /[x]/;
    const testString2 = '16.6 x 10.9 x 8.1 mm \
    16.6 x 10.9 x 8.1 mm \
    16.6 x 10.9 x 8.1 mm';
    folliclesRegex2.test(testString2);
    // If regex 2 matches: 
    // Delimit by return carrier or tab or mm
    const follicleInfo = testString2.split('mm');

    const sizeList = []
    for (const follicle of follicleInfo) {
        // Then delimit by x
        const follicleTmpSizes = follicle.split('x');
        if (follicleTmpSizes.length !=3) {
            console.log('iznogood');
        }
        const follicleSizeList = [];
        for (const follicleTmpSize of follicleTmpSizes) {
            // Remove space and cast to float
            const tmp = follicleTmpSize.replace(/\s/g, '');
            const size = parseFloat(tmp);
            follicleSizeList.push(size);
        }
        // For a given follicle, its size is the average of the 3 numbers given
        const size = round(follicleSizeList[0] * follicleSizeList[1] * follicleSizeList[2]).toString();
        sizeList.push(size);
    }
    return sizeList;
}

// Sample format: 'Follicle 10 15.9 mm 11.8 mm 13.8 mm 1.162 cm³ Follicle 11 15.9 mm 11.8 mm 13.8 mm 1.162 cm³ Follicle 12 15.9 mm 11.8 mm 13.8 mm 1.162 cm³'
// Objective: For each follicle (delimited between 'Follicle and a volume in cm3) get the penultimate number, which is the average of the previous numbers.
function case3() {
    // Regex 3 
    // detect 'follicle'
    const testString3 = 'Follicle 10 15.9 mm 11.8 mm 13.8 mm 1.162 cm³ Follicle 11 15.9 mm 11.8 mm 13.8 mm 1.162 cm³ Follicle 12 15.9 mm 11.8 mm 13.8 mm 1.162 cm³';
    // If regex 3 matches: 
    const folliclesRegex3 = /[Follicle]/;
    folliclesRegex3.test(testString3);
    // Delimit by cm3
    const follicleInfo = testString3.split('cm³');

    const follicleSizeList = [];
    for (const follicle of follicleInfo) {
        // Get the penultimate number
        const size = follicle.split('mm');
        const avgSize =  parseFloat(size[size.length -2 ].replace(/\s/g, ''));
        follicleSizeList.push(avgSize);
    }
    return follicleSizeList;
}




