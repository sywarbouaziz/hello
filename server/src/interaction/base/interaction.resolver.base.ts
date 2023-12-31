/*
//------------------------------------------------------------------------------ 
// This code was generated by Amplication. 
// 
// Changes to this file will be lost if the code is regenerated. 
//
// There are other ways to to customize your code, see this doc to learn more
// https://docs.amplication.com/docs/how-to/custom-code
//
//------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { CreateInteractionArgs } from "./CreateInteractionArgs";
import { UpdateInteractionArgs } from "./UpdateInteractionArgs";
import { DeleteInteractionArgs } from "./DeleteInteractionArgs";
import { InteractionFindManyArgs } from "./InteractionFindManyArgs";
import { InteractionFindUniqueArgs } from "./InteractionFindUniqueArgs";
import { Interaction } from "./Interaction";
import { InteractionService } from "../interaction.service";

@graphql.Resolver(() => Interaction)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class InteractionResolverBase {
  constructor(
    protected readonly service: InteractionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    protected readonly logger: Logger
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Interaction",
    action: "read",
    possession: "any",
  })
  async _interactionsMeta(
    @graphql.Args() args: InteractionFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Interaction])
  @nestAccessControl.UseRoles({
    resource: "Interaction",
    action: "read",
    possession: "any",
  })
  async interactions(
    @graphql.Args() args: InteractionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaginatedInterface<Interaction>> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Interaction",
    });
    const results = await this.service.findMany(args);
    const result = results.paginatedResult.map((result: Interaction) =>
      permission.filter(result)
    );
    return { paginatedResult: result, totalCount: results.totalCount };
  }

  @graphql.Query(() => Interaction, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Interaction",
    action: "read",
    possession: "own",
  })
  async interaction(
    @graphql.Args() args: InteractionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Interaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Interaction",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Interaction)
  @nestAccessControl.UseRoles({
    resource: "Interaction",
    action: "create",
    possession: "any",
  })
  async createInteraction(
    @graphql.Args() args: CreateInteractionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Interaction> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Interaction",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Interaction"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Interaction)
  @nestAccessControl.UseRoles({
    resource: "Interaction",
    action: "update",
    possession: "any",
  })
  async updateInteraction(
    @graphql.Args() args: UpdateInteractionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Interaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Interaction",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Interaction"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Interaction)
  @nestAccessControl.UseRoles({
    resource: "Interaction",
    action: "delete",
    possession: "any",
  })
  async deleteInteraction(
    @graphql.Args() args: DeleteInteractionArgs
  ): Promise<Interaction | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
