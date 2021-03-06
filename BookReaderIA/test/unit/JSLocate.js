// Tests for BookReaderJSLocate.php

// $$$ TODO -- make the test host configurable/automagic

module("JSLocate");

testHost = 'http://www-testflip.archive.org';

// Returns locator URL for the given id
function jsLocateURL(bookId) {
    return testHost + '/bookreader/BookReaderJSLocate.php?id=' + bookId;
}

// Set up dummy BookReader class for JSLocate
function BookReader() {
};

BookReader.prototype.init = function() {
    return true;
};

asyncTest("JSLocate for notesonsubmarine00grea", function() {
    expect(1);
    $.getScript( jsLocateURL('notesonsubmarine00grea'),
        function(data, textStatus) {
            equals(window.br.titleLeaf, 5, 'Metadata loaded.  See https://bugs.launchpad.net/bookreader/+bug/517424. Title leaf');
            start();
        }
    );
});

asyncTest("JSLocate for photographingclo00carprich", function() {
    expect(1);
    $.getScript( jsLocateURL('photographingclo00carprich'),
        function(data, textStatus) {
            equals(window.br.bookTitle, 'Photographing clouds from an airplane',  'Title of book');
            start();
        }
    );
});

asyncTest("JSLocate for salmoncookbookho00panaiala", function() {
    expect(1);
    $.getScript( jsLocateURL('salmoncookbookho00panaiala'),
        function(data, textStatus) {
            equals(window.br.numLeafs, 40,  'Number of pages');
            start();
        }
    );
});
