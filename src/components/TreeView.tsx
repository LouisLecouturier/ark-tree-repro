import { TreeView } from "@ark-ui/react";
import { TreeCollection } from "@ark-ui/react/collection";
type Attributes = {
    content?: React.ReactNode; // REACT NODE
    onClick?: () => void;
    active?: boolean;
    disabled?: boolean;
};

export type Node = {
    id: string;
    name: string;
    attributes?: Attributes;
    children?: Node[];
};

type TreeViewProps = {
    collection: TreeCollection<Node>;
};

export const MyTreeView = (props: TreeViewProps) => {
    return (
        <TreeView.Root collection={props.collection}>
            <TreeView.Tree className="space-y-0.5">
                {props.collection.rootNode.children?.map((node, index) => (
                    <TreeNode key={node.id} node={node} indexPath={[index]} />
                ))}
            </TreeView.Tree>
        </TreeView.Root>
    );
};

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
    const { node, indexPath } = props;

    const elementClassName = "flex gap-8 p-2 rounded-md bg-gray-100";

    return (
        <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
            {node.children ? (
                <TreeView.Branch>
                    <TreeView.BranchControl className={elementClassName}>
                        <TreeView.BranchText>
                            {/* HERE WE WANT TO PASS A REACT NODE (attributes.content) */}
                            {node.attributes?.content || node.name}
                        </TreeView.BranchText>
                        <TreeView.BranchIndicator>
                            {">"}
                        </TreeView.BranchIndicator>
                    </TreeView.BranchControl>
                    <TreeView.BranchContent className="pl-4">
                        {node.children.map((child, index) => (
                            <TreeNode
                                key={child.id}
                                node={child}
                                indexPath={[...indexPath, index]}
                            />
                        ))}
                    </TreeView.BranchContent>
                </TreeView.Branch>
            ) : (
                <TreeView.Item className={elementClassName}>
                    <TreeView.ItemText>
                        {/* HERE WE WANT TO PASS A REACT NODE (attributes.content) */}
                        {node.attributes?.content || node.name}
                    </TreeView.ItemText>
                </TreeView.Item>
            )}
        </TreeView.NodeProvider>
    );
};
