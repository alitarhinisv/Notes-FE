import { NextPage } from 'next';
import Layout from '../../components/layout/Layout';
import UserList from '../../components/users/UserList';
import { withAdmin } from '../../contexts/AuthContext';

const AdminUsers: NextPage = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Manage Users</h1>
                    <p className="mt-1 text-sm text-gray-500">Admin panel for user management.</p>
                </div>

                <div className="mt-6">
                    <UserList />
                </div>
            </div>
        </Layout>
    );
};

export default withAdmin(AdminUsers);