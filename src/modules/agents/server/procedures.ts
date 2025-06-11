import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import {db} from "@/db";
import {agents} from "@/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { agentsInsertScheama } from "../schemas";
import {z} from "zod";

export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({id: z.string()})).query(async ({input}) => {
        const [existingAgent] = await db
            .select()
            .from(agents)
            .where(eq(agents.id, input.id));
        
        //throw new TRPCError({code: "BAD_REQUEST"});
        return existingAgent;
    }),
    getMany: protectedProcedure.query(async () => {
        const data = await db
            .select()
            .from(agents); 
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate a delay

        //throw new TRPCError({code: "BAD_REQUEST"});

        
        return data;
    }),
    create: protectedProcedure.input(agentsInsertScheama).mutation(async ({ input, ctx }) => {
        const [createdAgent] = await db
            .insert(agents)
            .values({
                ...input,
                userId: ctx.auth.user.id,
            })
            .returning();

            return createdAgent;
    }),
});