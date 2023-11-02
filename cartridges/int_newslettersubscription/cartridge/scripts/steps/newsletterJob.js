var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
var Transaction = require('dw/system/Transaction');

module.exports.execute = function () {
    var newsletterObjIterator = CustomObjectMgr.getAllCustomObjects('Newsletter-Homework');

    var file
    var fileWrite
    var csv
    try {
        file = new File([File.IMPEX, "newsletterSubs", "newsletterSubs.csv"].join(File.SEPARATOR));
        fileWrite = new FileWriter(file);

        csv = new CSVStreamWriter(fileWrite);
        csv.writeNext(["EMAIL", "FIRST NAME", "LAST NAME", "GENDER"]);
        csv.writeNext(["---", "---", "---", "---"]);

        while (newsletterObjIterator.hasNext()) {
            var newsletter = newsletterObjIterator.next();
            csv.writeNext([newsletter.custom.email, newsletter.custom.firstName, newsletter.custom.lastName, newsletter.custom.gender]);

            Transaction.wrap(function () {
                CustomObjectMgr.remove(newsletter)
            })
        }

    } catch (e) {

    } finally {
        csv.close()
        fileWrite.close();
    }
}