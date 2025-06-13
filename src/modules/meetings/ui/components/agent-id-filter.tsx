import { useState } from "react";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CommandSelect } from "@/components/command-select";
import { GenerateAvatar } from "@/components/generate-avatar";


export const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();

    const trpc = useTRPC();

    const [agentSearch, setAgentSearch] = useState("");
    const { data } = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch,
        }),
    );

    return (
        <CommandSelect
            className="h-9"
            placeholder="Agent"
            options={(data?.items ?? []).map((agent) => ({
                id: agent.id,
                value: agent.id,
                children: (
                    <div className="flex items-center gap-x-2">
                        <GenerateAvatar
                            seed={agent.name}
                            variant="bottsNeutral"
                            className="size-4"
                        />
                        {agent.name}
                    </div>
                )
            }))}
            onSelect={(value) => setFilters({agentId: value})}
            onSearch={setAgentSearch}
            value={filters.agentId ?? ""}
        />
    )
}