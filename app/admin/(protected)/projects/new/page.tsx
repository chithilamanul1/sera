'use client';

import ProjectEditor from '../components/ProjectEditor';

export default function NewProjectPage() {
    return (
        <div className="py-10">
            <ProjectEditor mode="create" />
        </div>
    );
}
