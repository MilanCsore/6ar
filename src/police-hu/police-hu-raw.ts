import * as cheerio from 'cheerio';

interface rawEntriesData {
  crossings: string;
  openhours: string;
  queuetimes: [string,string];

}

//Extracts the crossing Names and returns the raw text

function extractCrossingNamesRawData(htmlContent: string) {
  const $ = cheerio.load(htmlContent);


  const crossingRawTexts = $('#borderinfo-accordions a > span:first-of-type').text();

  return crossingRawTexts;
}

//Extracts the Open hours, and returns the raw string

function extractOpenHoursRawData(htmlContent: string) {
  const $ = cheerio.load(htmlContent);

  const hoursRawText = $('#borderinfo-accordions a > span:nth-of-type(2)').text();

  return hoursRawText;
}

// Extract the traffic entries and returns the values as string
function extractQueueTimesRawData (htmlContent: string): [string,string] {
  const $ = cheerio.load(htmlContent);

  const inTrafficRawData = $('div.col-md-3:first-of-type > div:not(.label)').text();
  const outTrafficRawData = $('div.col-md-3:nth-of-type(2) > div:not(.label)').text();

  const inTrafficOutTrafficRawData = [inTrafficRawData,outTrafficRawData];

  return inTrafficOutTrafficRawData;
}

function extractCrossingRawInformation (rawcontent: string): rawEntriesData{
  const crossingRawNames = extractCrossingNamesRawData(rawcontent);
  const OpenHoursRawData = extractOpenHoursRawData(rawcontent);
  const queueTimesRawData = extractQueueTimesRawData(rawcontent);



  return {
    crossings:crossingRawNames,
    openhours:OpenHoursRawData,
    queuetimes:queueTimesRawData
  };

}

