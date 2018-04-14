const expect = require('expect.js');
import Utils from '../web/services/Utils';

describe('Utils', () => {
   describe("getDateRanges", () => {
      let input = ["2018-07-01", "2018-07-02", "2018-07-03", "2018-07-06", "2018-07-07", "2018-07-08", "2018-07-10", "2018-07-11"];
      let expected = ["2018-07-01 - 2018-07-03", "2018-07-06 - 2018-07-08", "2018-07-10 - 2018-07-11"];

      const result = Utils.getDateRanges(input);

      expect(result).to.eql(expected);
   });

   describe('getDatesInRange', () => {
      const from = "2018-04-01";
      const to = "2018-04-05";
      const result = Utils.getDatesInRange(from, to);

      const expected = ["2018-04-01", "2018-04-02", "2018-04-03", "2018-04-04", "2018-04-05"]
      expect(result).to.eql(expected);

   });
});