// 
// This file shows the minimum you need to provide to GnuBook to display a book
//
// Copyright(c)2008-2009 Internet Archive. Software license AGPL version 3.

// Create the GnuBook object
gb = new GnuBook();

// Return the width of a given page.  Here we assume all images are 800 pixels wide
gb.getPageWidth = function(index) {
    return 800;
}

// Return the height of a given page.  Here we assume all images are 1200 pixels high
gb.getPageHeight = function(index) {
    return 1200;
}

// We load the images from archive.org -- you can modify this function to retrieve images
// using a different URL structure
gb.getPageURI = function(index) {
    var leafStr = '000';
    var imgStr = (index+1).toString();
	if (index > 14) imgStr = '14';
    var re = new RegExp("0{"+imgStr.length+"}$");
    var url = 'pages/page'+leafStr.replace(re, imgStr) + '.jpg';
    return url;
}

// Return which side, left or right, that a given page should be displayed on
gb.getPageSide = function(index) {
    if (0 == (index & 0x1)) {
        return 'R';
    } else {
        return 'L';
    }
}

// This function returns the left and right indices for the user-visible
// spread that contains the given index.  The return values may be
// null if there is no facing page or the index is invalid.
gb.getSpreadIndices = function(pindex) {   
    var spreadIndices = [null, null]; 
    if ('rl' == this.pageProgression) {
        // Right to Left
        if (this.getPageSide(pindex) == 'R') {
            spreadIndices[1] = pindex;
            spreadIndices[0] = pindex + 1;
        } else {
            // Given index was LHS
            spreadIndices[0] = pindex;
            spreadIndices[1] = pindex - 1;
        }
    } else {
        // Left to right
        if (this.getPageSide(pindex) == 'L') {
            spreadIndices[0] = pindex;
            spreadIndices[1] = pindex + 1;
        } else {
            // Given index was RHS
            spreadIndices[1] = pindex;
            spreadIndices[0] = pindex - 1;
        }
    }
    
    return spreadIndices;
}

// For a given "accessible page index" return the page number in the book.
//
// For example, index 5 might correspond to "Page 1" if there is front matter such
// as a title page and table of contents.
gb.getPageNum = function(index) {
	return index+1;
}

// Total number of leafs
gb.numLeafs = 60;

// Book title and the URL used for the book title link
gb.bookTitle= 'Open Library Bookreader Presentation';
gb.bookUrl  = 'http://openlibrary.org';

// thumbnail view
gb.mode = 3;
gb.thumbScale = 8;

// Let's go!
gb.init();
