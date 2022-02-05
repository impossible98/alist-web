import { Center } from '@chakra-ui/react';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
const Index = lazy(() => import('./pages/list'));
const Manage = lazy(() => import('./pages/manage'));
import { ClimbingBoxLoader } from 'react-spinners';

function App() {
    return (
        <div className='App'>
            <Router>
                <Suspense
                    fallback={
                        <Center h='100vh'>
                            {/* <Spinner color="#1890ff" size="xl" /> */}
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
            </Router>
        </div>
    );
}

export default App;
