import React from 'react';
import { configs } from '../../contants';

export function StudyLoginScreen() {
    const generateUrl = () => {
        return `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${configs.clientId}&redirect_uri=${configs.redirectUrl}&scope=activity nutrition heartrate location nutrition profile settings sleep social weight`
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for Research Study</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Logging in here gives consent to {''}
                        <a href="https://www.google.com" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Terms and Conditions
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6" action={generateUrl()} method="POST">
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in with Fitbit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
