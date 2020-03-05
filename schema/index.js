const { buildSchema } = require('graphql');
module.exports = buildSchema(`
type ProductType {
    _id: ID!
    productType: String!
}
type Item {
    _id: ID!
    description: String!
    creator: String!
    type: ProductType!
    sex: String!
    size: [String!]!
    price: Float!
    count: Float!
    mediaUrl: String!
    createdAt: String!
    updatedAt: String!
}
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    cart: [Item!]

}
type ProcessTrx {
    publishableKey: String!
    clientSecret: String!
}
type LoginResponse {
    id: String!
    token: String!,
    expDate: String!
}
input ProductInput {
    description: String!
    creator: String!
    type: String!
    size: [String!]!
    sex: String!
    price: Float!
    mediaUrl: String!
}

type RootQuery {
    getProducts: [Item!]!
    getProduct(productId: String!): Item!
    getCategory(sex: String!): [Item!]!
    getProductType: [ProductType!]!
    getCart: [Item!]!
    login(email: String!, password: String!): LoginResponse!
}


type RootMutation {
    createProduct(productInput:ProductInput!): Item!
    createProductType (productType: String!): ProductType!
    addToCart(item: String!, size: String!): Item!
    processTransaction(amount: Float!, currency: String!): ProcessTrx
}
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
