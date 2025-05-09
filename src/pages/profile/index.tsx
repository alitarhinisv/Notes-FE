import { NextPage } from 'next';
import Layout from '../../components/layout/Layout';
import ProfileForm from '../../components/users/ProfileForm';
import { withAuth } from '../../contexts/AuthContext';

const Profile: NextPage = () => {
    return (
        <Layout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Your Profile</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your account information.</p>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ProfileForm />
                </div>
            </div>
        </Layout>
    );
};

export default withAuth(Profile);