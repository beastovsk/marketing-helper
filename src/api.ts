import {getCookie} from 'cookies-next';

// const API_URL = 'http://localhost:3005';
const API_URL = 'https://marketing-helper-server.onrender.com';
export const LoginRequest = async (data) => {
  return await fetch(`${API_URL}/api/auth/login`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const RegRequest = async (data) => {
  return await fetch(`${API_URL}/api/auth/register`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const ConfirmEmail = async (args: {confirmToken: string}) => {
  return await fetch(`${API_URL}/api/auth/confirmEmail`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const SendResetCode = async (args: {email: string}) => {
  return await fetch(`${API_URL}/api/auth/sendResetCode`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const ResetPassword = async (args: {password: string; confirmToken: string}) => {
  return await fetch(`${API_URL}/api/auth/resetPassword`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const ChangeEmail = async (args: {currentEmail: string; newEmail: string; password: string}) => {
  return await fetch(`${API_URL}/api/user/changePassword`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const ChangePassword = async (args: {password: string; currentPassword: string}) => {
  return await fetch(`${API_URL}/api/user/changeEmail`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const GetUser = async () => {
  return await fetch(`${API_URL}/api/user/getUser`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const ChangeCampaign = async (args) => {
  return await fetch(`${API_URL}/api/user/updateCampaign`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const StatisticCampaign = async () => {
  return await fetch(`${API_URL}/api/page/getStatistic`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    }
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
export const UpdateStatistic = async () => {
  return await fetch(`${API_URL}/api/page/updateCampaignStatistic`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    }
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
export const SendSupportMessage = async (body) => {
  return await fetch(`${API_URL}/api/page/sendSupportMessage`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${API_URL}`,
      'Access-Control-Allow-Headers': `${API_URL}`
    },
    method: 'POST',
    body: JSON.stringify(body)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
export const UpdateSubscription = async (data) => {
  return await fetch(`${API_URL}/api/user/updateSubscription`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
export const confirmSubscription = async (data) => {
  return await fetch(`${API_URL}/api/user/confirmSubscription`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
