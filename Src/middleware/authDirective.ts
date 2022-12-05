

import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils"
import GQLAuthUser from "../models/user.model";
import { Auth } from "./auth";

const authDirectiveTransformer = (schema: any, directiveName: string) => {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD as string]: (fieldConfig: any) => {
            try {
                const authDirective = getDirective(schema, fieldConfig, directiveName);
                if (authDirective) {
                    const { resolve } = fieldConfig;
                    fieldConfig.resolve = async (parent: any, args: any, context: any, info: any) => {
                        const { request } = context
                        const isUserAthorized = Auth(request);
                        if (!isUserAthorized) {
                            throw new Error("No User logged in")
                        }
                        const currentUser = await GQLAuthUser.findById({ _id: isUserAthorized })
                        const { role } = authDirective[0]
                        console.log(currentUser?.userType == role)
                        if (currentUser?.userType != role) {
                            throw new Error("Oops you dont have permissions to perfom the command")
                        }
                        const result = await resolve(parent, args, context, info)
                        return result;
                    }
                }
            } catch (e) {
                console.log("Error in mapping", e);
            }
        }
    })
}

export default authDirectiveTransformer