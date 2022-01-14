import React from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import Login from '../../Login/Login';
import ForgotPassword from '../../Login/ForgotPassword';
import CreateAccount from '../CreateAccount/CreateAccount';
import VerificationCode from '../CreateAccount/VerificationCode';
import EmailVerificationCode from '../CreateAccount/EmailVerificationCode';
import Dashboard from '../Dashboard/Dashboard';
import Invoices from '../Invoices/Invoices';
import Profile from '../Profile/Profile';
import SideBar from './SideBar/Sidebar';
// import LoginFinancial from "../../LoginFinancial/LoginFinancial";
import SideBarFinancial from './SideBarFinancial/SideBarFinancial';
import SideBarSuperUser from './SideBarSuperUser/SideBarSuperUser';
import CreateDocument from '../CreateDocument/CreateDocument';
import DashboardFinancial from '../Dashboard/DashboardFinancial';
import BuyerSignedDocument from '../BuyerQuotation/BuyerSignedDocument';
import ReviewTemplate from '../Invoices/InvoicesTab/ReviewTemplate';
import VerifyDoc from '../ApproveCertificate/VerifyDoc';
import Logout from '../Logout/Logout';
import authService from '../../services/authService';
import SalesQuotationTab from '../SalesQuotation/SalesQuotationTab';
import PaymentCertificateTab from '../PaymentCertificate/PaymentCertificateTab';
import DeliveryOrderTab from '../DeliveryOrder/DeliveryOrderTab';
import InvoicesFinancialTab from '../InvoicesFinancial/InvoicesFinancialTab';
import NOATemplate from '../Invoices/InvoicesTab/NOATemplate';
import Home from '../Home/Home';
import CreateInvestorSchedule from '../InvoicesFinancial/InvestorSchedule/CreateInvestorSchedule';
import PrivacyPolicy from '../Home/HelpfulLinks/PrivacyPolicy';
import TermsNConditions from '../Home/HelpfulLinks/TermsNConditions';
import Faq from '../Home/HelpfulLinks/Faq';
import ResetPassword from '../../Login/ResetPassword';
import StudentCertificates from '../DeliveryOrder/StudentCertificates';
import BatchDetails  from '../PaymentCertificate/BatchDetails';
import Settings from '../Settings/Settings';
import ApproveCertificate from '../ApproveCertificate/ApproveCertificate';

function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route
          exact={true}
          path='/'
          render={(e, props) =>
            <Redirect to='login'></Redirect>
            // <Home {...e} data={props} />
          }
        />
        <Route
          exact={true}
          path='/login'
          render={(e, props) =>
            authService.getAuthToken() &&
            (!authService.getRole() ||
            authService.getRole() === 'administrator') ? (
              <Redirect to='Certificate'></Redirect>
            ) : authService.getRole() === 'superUser' ? (
              <Redirect to='Settings'></Redirect>
            ) : authService.getRole() === 'approver' ? (
              <Redirect to='Certificate'></Redirect>
            ) : (
              <Login {...e} data={props} />
            )
          }
        />
        <Route
          exact={true}
          path='/dashboard'
          render={(e, props) =>
            authService.getAuthToken() &&
            (!authService.getRole() ||
              authService.getRole() === 'enterprise') ? (
              <SideBar>
                <Dashboard {...e} data={props} />
              </SideBar>
            ) : (
              <Redirect to='login'></Redirect>
            )
          }
        />
        {/* <Route
          exact={true}
          path="/"
          render={(e, props) => (
            <SideBar>
              <Dashboard {...e} data={props} />
            </SideBar>
          )}
        /> */}
        <Route
          exact={true}
          path='/Settings'
          render={(e, props) =>
            authService.getAuthToken() &&
            (!authService.getRole() ||
              authService.getRole() === 'superUser') ? (
                <SideBarSuperUser>
                  <Settings {...e} data={props} />
                </SideBarSuperUser>
            ) : (
              <Redirect to='login'></Redirect>
            )
          }
        />
        <Route
          exact={true}
          path='/Certificate'
          render={(e, props) => (
            <SideBar>
              <SalesQuotationTab {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path='/Students'
          render={(e, props) => (
            <SideBar>
              <DeliveryOrderTab {...e} data={props} />
            </SideBar>
          )}
          
        />
        <Route
          exact={true}
          path='/Students/:id'
          render={(e, props) => (
            <SideBar>
              <StudentCertificates {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path='/History'
          render={(e, props) => (
            <SideBar>
              <PaymentCertificateTab {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path='/History/:id'
          render={(e, props) => (
            <SideBar>
              <BatchDetails {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path='/approveCertificate/:docHash'
          render={(e, props) => <ApproveCertificate {...e} data={props} />}
        />
        <Route
          exact={true}
          path='/invoices'
          render={(e, props) => (
            <SideBar>
              <Invoices {...e} data={props} />
            </SideBar>
          )}
        ></Route>
        <Route
          exact={true}
          path='/profile'
          render={(e, props) => (
            <SideBar>
              <Profile {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path='/financialAcknowledge'
          render={(e, props) => <NOATemplate {...e} data={props} />}
        />
        <Route
          exact={true}
          path='/reviewNOATemplate'
          render={(e, props) => (
            <SideBar>
              <ReviewTemplate {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path='/createDocument/:docType'
          render={(e, props) => (
            <SideBar>
              <CreateDocument {...e} data={props} />
            </SideBar>
          )}
        />
        <Route exact={true} path='/logout' component={Logout} />
        {/* <Route
          exact={true}
          path="/login"
          render={(e, props) => <Login {...e} data={props} />}
        /> */}
        <Route
          exact={true}
          path='/verifyDoc/:via'
          render={(e, props) => <VerifyDoc {...e} data={props} />}
        />
        <Route
          exact={true}
          path='/buyerSignedDocument/:docHash'
          render={(e, props) => <BuyerSignedDocument {...e} data={props} />}
        />
        <Route
          exact={true}
          path='/buyerSignedNOADocument/:docHash'
          render={(e, props) => <BuyerSignedDocument {...e} data={props} />}
        />
        <Route
          exact={true}
          path='/forgotpassword'
          render={(e, props) => <ForgotPassword {...e} data={props} />}
        />
        <Route
          exact={true}
          path='/resetPassword'
          render={(e, props) => <ResetPassword {...e} data={props} />}
        />
        {/* <Route
          exact={true}
          path="/createAccount"
          render={(e, props) => <CreateAccount {...e} data={props} />}
        /> */}

        {/* <Route
          exact={true}
          path='/createAccount'
          render={(e, props) =>
            authService.getAuthToken() &&
            (!authService.getRole() ||
              authService.getRole() === 'enterprise') ? (
              <Redirect to='dashboard'></Redirect>
            ) : authService.getRole() === 'financier' ? (
              <Redirect to='dashboardFinancial'></Redirect>
            ) : (
              <CreateAccount {...e} data={props} />
            )
          }
        /> */}

        <Route
          exact={true}
          path='/verificationCode/:via'
          render={(e, props) => <VerificationCode {...e} data={props} />}
        />
        <Route
          exact={true}
          path='/emailVerification'
          render={(e, props) => <EmailVerificationCode {...e} data={props} />}
        />

        <Route
          exact={true}
          path='/loginFinancier'
          render={(e, props) =>
            authService.getAuthToken() &&
            (!authService.getRole() ||
              authService.getRole() === 'enterprise') ? (
              <Redirect to='dashboard'></Redirect>
            ) : authService.getRole() === 'financier' ? (
              <Redirect to='dashboardFinancial'></Redirect>
            ) : (
              <Login {...e} data={props} />
            )
          }
        />

        {/* <Route
          exact={true}
          path="/loginFinancier"
          render={(e, props) => <Login {...e} data={props} />}
        /> */}

        <Route
          exact={true}
          path='/profileFinancial'
          render={(e, props) => (
            <SideBarFinancial>
              <Profile {...e} data={props} />
            </SideBarFinancial>
          )}
        />
        <Route
          exact={true}
          path='/dashboardFinancial'
          render={(e, props) =>
            authService.getAuthToken() &&
            authService.getRole() === 'financier' ? (
              <SideBarFinancial>
                <DashboardFinancial {...e} data={props} />
              </SideBarFinancial>
            ) : (
              <Redirect to='loginFinancier'></Redirect>
            )
          }
        />

        {/* <Route
          exact={true}
          path="/dashboardFinancial"
          render={(e, props) => (
            <SideBarFinancial>
              <DashboardFinancial {...e} data={props} />
            </SideBarFinancial>
          )}
        /> */}

        <Route
          exact={true}
          path='/invoicesFinancial/invoices/investorSchedule'
          render={(e, props) =>
            authService.getSelectedInvoices() ? (
              <SideBarFinancial>
                <CreateInvestorSchedule {...e} data={props} />
              </SideBarFinancial>
            ) : (
              e.history.goBack()
            )
          }
        />

        <Route
          exact={true}
          path='/invoicesFinancial/:goTo'
          render={(e, props) => (
            <SideBarFinancial>
              <InvoicesFinancialTab {...e} data={props} />
            </SideBarFinancial>
          )}
        />
        <Route
          exact={true}
          path='/logoutFinancial'
          component={Logout}
          // render={props => {
          //   localStorage.clear();
          //   props.history.push("loginFinancier");
          // }}
        />
        <Route
          exact={true}
          path='/api/v1/hash/:docHash'
          render={(e) => {
            return authService.getAuthToken() &&
            authService.getRole() === 'approver' ? (
              <Redirect
                to={`/approveCertificate/${e.match.params.docHash}`}
              ></Redirect>
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    from: `approveCertificate/${e.match.params.docHash}`,
                  },
                }}
              />
            );
          }}
        />

        <Route
          exact={true}
          path='/api/v1/hash/financing/documents/:docHash'
          render={(e) => {
            return authService.getAuthToken() ? (
              <Redirect
                to={`/buyerSignedNOADocument/${e.match.params.docHash}`}
              ></Redirect>
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    from: `buyerSignedNOADocument/${e.match.params.docHash}`,
                  },
                }}
              />
            );
          }}
        />

        <Route
          exact={true}
          path='/api/v1/auth/verify/:encode'
          render={(e) => (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  urlLink: `verifyEmail`,
                  emailEncode: e.match.params.encode,
                },
              }}
            />
          )}
        />

        <Route
          exact={true}
          path='/api/v1/auth/forget/Password/verify/:encode'
          render={(e) => (
            <ResetPassword {...e}/>
          )}
        />
        
        <Route
          exact={true}
          path='/api/v1/login'
          render={(e) => (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          )}
        />

        <Route
          exact={true}
          path='/privacyPolicy'
          render={(e, props) => <PrivacyPolicy {...e} data={props} />}
        />
        <Route
          exact={true}
          path='/termsNConditions'
          render={(e, props) => <TermsNConditions {...e} data={props} />}
        />
        <Route
          exact={true}
          path='/faq'
          render={(e, props) => <Faq {...e} data={props} />}
        />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
