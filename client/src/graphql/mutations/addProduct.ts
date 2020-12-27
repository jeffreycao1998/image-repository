import { gql } from 'apollo-boost'

const ADD_PRODUCT = gql`
  mutation addProduct($product: Product) {
    addProduct(product: $product) {
      success
    }
  }
`;

export default ADD_PRODUCT;