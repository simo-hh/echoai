import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/modules/agents/params";

interface Props {
    searchParams: Promise<SearchParams>
}

const Page =  async ({searchParams} : Props) => {
    const filters = await loadSearchParams(searchParams);
    const session = await auth.api.getSession({
            headers: await headers(),
        
          });
          if (!session) {
            return (
              redirect("/sign-in")
            );
          }
          
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({
            ...filters,
        })
    );
    
    return (
        <>
            <MeetingsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<MeetingsViewLoading />}>
                    <ErrorBoundary fallback={<MeetingsViewError />}>
                        <MeetingsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    );
};

export const MeetingsViewLoading = () => {
    return (
        <LoadingState title="Loading Meetings" description="It may take a few seconds"/>
    );
}

export const MeetingsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Meetings"
            description={"Please try again later"}/>
    );
}

export default Page;