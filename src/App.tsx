import { Center } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
const Index = React.lazy(() => import('./pages/list'));
const Manage = React.lazy(() => import('./pages/manage'));
import { ClimbingBoxLoader } from 'react-spinners';

function App() {
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <Center h='100vh'>
                        <ClimbingBoxLoader color='#1890ff' loading={true} size={20} />
                    </Center>
                }
            >
                <Switch>
                    <Route path='/@manage/'>
                        <Manage />
                    </Route>
                    <Route path='*'>
                        <Index />
                    </Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
