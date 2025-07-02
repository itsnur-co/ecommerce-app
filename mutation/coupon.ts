import { gql } from "@apollo/client";

export const APPLY_COUPON= gql`
 mutation APPLY_COUPON($input: ApplyCouponInput!) {
  applyCoupon(input: $input) {
    cart {
      appliedCoupons {
        code
      }
      subtotal
      total
      discountTotal
    }
  }
}
`;


export const REMOVE_COUPON = gql`
 mutation REMOVE_COUPON($input: RemoveCouponsInput!) {
  removeCoupons(input: $input) {
    cart {
      appliedCoupons {
        code
      }
      subtotal
      total
      discountTotal
    }
  }
}

`;

