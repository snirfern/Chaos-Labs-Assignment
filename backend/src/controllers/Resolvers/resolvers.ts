import {queryResolvers} from "./queryResolvers";
import {mutationResolvers} from "./mutationResolvers";

const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
};

export default resolvers;
