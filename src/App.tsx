import { createTreeCollection } from "@ark-ui/react";
import { MyTreeView, Node } from "./components/TreeView";

function App() {
    const collection = createTreeCollection<Node>({
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.name,
        rootNode: {
            id: "ROOT",
            name: "",
            children: [
                {
                    id: "node_modules",
                    name: "node_modules",
                    attributes: {
                        // HERE WE PASS A REACT NODE THAT THROWS A MAXIMUM CALL STACK SIZE EXCEEDED ERROR
                        content: (
                            <span className={"text-red-500"}>
                                My Node Modules
                            </span>
                        ),
                    },
                },
                {
                    id: "src",
                    name: "src",
                    children: [
                        { id: "src/app.tsx", name: "app.tsx" },
                        { id: "src/index.ts", name: "index.ts" },
                    ],
                },
                { id: "panda.config", name: "panda.config.ts" },
            ],
        },
    });

    return (
        <div className="flex flex-col gap-16 m-16">
            <section className="flex flex-col gap-8 border rounded-xl p-4">
                <header>
                    <h1 className="text-2xl font-bold">Tree View</h1>
                    <p>I want to pass ReactNodes to the TreeView</p>
                </header>
                <MyTreeView collection={collection} />
            </section>
        </div>
    );
}

export default App;
