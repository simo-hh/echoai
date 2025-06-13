import {z } from 'zod';
export const meetingsInsertScheama = z.object({
    name: z.string().min(1, "Name is required"),
    agentId: z.string().min(1, "Agent is required"),
});

export const meetingsUpdateSchema = meetingsInsertScheama.extend({
    id: z.string().min(1, {message: "Id is required"}),
});