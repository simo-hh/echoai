import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

const Page = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    );
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsViewLoading />}>
                <ErrorBoundary fallback={<MeetingsViewError />}>
                    <MeetingsView />
                </ErrorBoundary>
            </Suspense>
        
            
        </HydrationBoundary>
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