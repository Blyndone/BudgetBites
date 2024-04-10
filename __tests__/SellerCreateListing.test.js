import { checkListingData } from '../src/components/Seller/SellerCreateListing';
import { checkDiscount } from '../src/components/Seller/SellerCreateListing';

global.alert = jest.fn();

describe('check form data', () => {
  test('check vaild inputs ', () => {
    expect(
      checkListingData(
        {
          name_text: 'Item Name',
          desc_text: 'Item Description',
          msrp: '100.00',
          user_id: '1',
          img_select: '1',
          category_text: 'Beef',
          expiration_text: '4',
          count: '1',
        },
        '50',
      ),
    ).toStrictEqual({
      name_text: 'Item Name',
      desc_text: 'Item Description',
      price_text: '50.00',
      msrp: '100.00',
      user_id: '1',
      img_select: '1',
      category_text: 'Beef',
      expiration_text: '4',
      count: '1',
    });
  }),
    test('check Name is blank ', () => {
      expect(
        checkListingData(
          {
            name_text: '',
            desc_text: 'Item Description',
            msrp: '100.00',
            user_id: '1',
            img_select: '1',
            category_text: 'Beef',
            expiration_text: '4',
            count: '1',
          },
          '50',
        ),
      ).not.toBeDefined();
    }),
    test('check Description is blank ', () => {
      expect(
        checkListingData(
          {
            name_text: 'Item Name',
            desc_text: '',
            msrp: '100.00',
            user_id: '1',
            img_select: '1',
            category_text: 'Beef',
            expiration_text: '4',
            count: '1',
          },
          '50',
        ),
      ).not.toBeDefined();
    }),
    test('check Discount is blank ', () => {
      expect(
        checkListingData(
          {
            name_text: 'Item Name',
            desc_text: 'Item Description',
            msrp: '100.00',
            user_id: '1',
            img_select: '1',
            category_text: 'Beef',
            expiration_text: '4',
            count: '1',
          },
          '',
        ),
      ).not.toBeDefined();
    }),
    test('count over 5 ', () => {
      expect(
        checkListingData(
          {
            name_text: 'Item Name',
            desc_text: 'Item Description',
            msrp: '100.00',
            user_id: '1',
            img_select: '1',
            category_text: 'Beef',
            expiration_text: '4',
            count: '10',
          },
          '50',
        ),
      ).not.toBeDefined();
    }),
    test('count is negative ', () => {
      expect(
        checkListingData(
          {
            name_text: 'Item Name',
            desc_text: 'Item Description',
            msrp: '100.00',
            user_id: '1',
            img_select: '1',
            category_text: 'Beef',
            expiration_text: '4',
            count: '-10',
          },
          '50',
        ),
      ).not.toBeDefined();
    }),
    test('discount is negative ', () => {
      expect(
        checkListingData(
          {
            name_text: 'Item Name',
            desc_text: 'Item Description',
            msrp: '100.00',
            user_id: '1',
            img_select: '1',
            category_text: 'Beef',
            expiration_text: '4',
            count: '10',
          },
          '-50',
        ),
      ).not.toBeDefined();
    }),
    test('Name > 100 characters ', () => {
      expect(
        checkListingData(
          {
            name_text:
              '11234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
            desc_text: 'Item Description',
            msrp: '100.00',
            user_id: '1',
            img_select: '1',
            category_text: 'Beef',
            expiration_text: '4',
            count: '1',
          },
          '50',
        ),
      ).not.toBeDefined();
    }),
    test('Description > 100 characters ', () => {
      expect(
        checkListingData(
          {
            name_text: 'Item Name',
            desc_text:
              '11234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
            msrp: '100.00',
            user_id: '1',
            img_select: '1',
            category_text: 'Beef',
            expiration_text: '4',
            count: '1',
          },
          '50',
        ),
      ).not.toBeDefined();
    });
});

describe('check discount Calculation', () => {
  test('check vaild inputs ', () => {
    expect(checkDiscount('100', '50')).toBe('50.00');
  }),
    test('check 0 input price ', () => {
      expect(checkDiscount('0', '50')).toBe('');
    }),
    test('check 0 input discount', () => {
      expect(checkDiscount('100', '0')).toBe('');
    }),
    test('check negative price ', () => {
      expect(checkDiscount('-100', '50')).toBe('');
    }),
    test('check negative discount ', () => {
      expect(checkDiscount('100', '-50')).toBe('');
    }),
    test('check discount >99 ', () => {
      expect(checkDiscount('100', '150')).toBe('');
    });
});
