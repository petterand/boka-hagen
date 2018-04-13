
import moment from 'moment';
function getDateRanges(strArray) {
   var ranges = [];
   var index = -1;

   while (index < strArray.length + 1) {
      const startIndex = index + 1;
      index = getRangeEndIndex(startIndex);
      if (strArray[startIndex] && strArray[index]) {
         ranges.push(`${strArray[startIndex]} - ${strArray[index]}`);
      }
   }

   function getRangeEndIndex(startIndex) {
      let index = startIndex;
      let nextInRange = true;
      do {
         const currDate = new Date(strArray[index]);
         const expectedNextDate = new Date(currDate.setDate(currDate.getDate() + 1));
         const actualNextDate = new Date(strArray[index + 1]);
         if (!moment(expectedNextDate).isSame(actualNextDate)) {
            nextInRange = false;
         } else {
            index++;
         }
      } while (nextInRange)
      return index;
   }

   return ranges;
}

export default {
   getDateRanges
}