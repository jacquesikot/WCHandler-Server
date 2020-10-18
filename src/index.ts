import { PORT } from './constants';
import App from './config/appServer';
import { Home, Users, Auth } from './controllers';

const app = new App([new Home(), new Users(), new Auth()], PORT);

app.listen();
