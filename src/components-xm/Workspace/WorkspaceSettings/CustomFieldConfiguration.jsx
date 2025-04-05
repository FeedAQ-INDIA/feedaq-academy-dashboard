import {SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb.jsx";
import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import React from "react";
import TagsTable from "@/components-xm/Workspace/TagsTable.jsx";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import CreateTeam from "@/components-xm/Workspace/WorkspaceSettings/CreateTeam.jsx";
import TeamTable from "@/components-xm/Workspace/WorkspaceSettings/TeamTable.jsx";
import CustomFieldConfigurationTable
    from "@/components-xm/Workspace/WorkspaceSettings/CustomFieldConfigurationTable.jsx";
import {Link, useParams} from "react-router-dom";

function CustomFieldConfiguration() {

    const {WorkspaceId} = useParams();

    return (
        <>
            <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1"/>
                <Separator orientation="vertical" className="mr-2 h-4"/>
                <Breadcrumb>
                    <BreadcrumbList>

                        <BreadcrumbItem>
                            <BreadcrumbPage>Field Configurations</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto sm:flex-initial">
                 </div>
            </header>

            <CardHeader className="flex md:flex-row sm:flex-col gap-4 items-center bg-muted/50">
                <CardTitle className="text-lg">Field Configurations</CardTitle>
                <div className="ml-auto sm:flex-initial">
                    <Link to={`/workspace/${WorkspaceId}/settings/field-configuration/create`}>
                        <Button size="sm">Create Field Config</Button>
                    </Link>
                </div>
            </CardHeader>

            <div className="flex flex-col gap-4 p-4">
<CustomFieldConfigurationTable/>
            </div>
        </>)

}


export default CustomFieldConfiguration;