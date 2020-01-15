const API_ROOT = `http://localhost:3000/api/v1`;
const token = () => localStorage.getItem('token');

const headers = () => ({
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    Authorization: token()
});

const login = data => {
    return fetch(`${API_ROOT}/auth`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    })
        .then(resp => resp.json());
};

const signup = data => {
    return fetch(`${API_ROOT}/users`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ user: data })
    })
        .then(resp => resp.json());
}

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
        headers: headers()
    })
        .then(resp => {
            return resp.json();
        });
};

const getMatchingUsersFromGreatest = interests => {
    return fetch(`${API_ROOT}/find_matches_by_greatest?filtered_interests=${interests}`, {
        headers: headers()
    })
    .then(resp => resp.json())
}

const getMatchingUsersFromLeast = interests => {
  return fetch(
    `${API_ROOT}/find_matches_by_least?filtered_interests=${interests}`,
    {
      headers: headers()
    }
  ).then(resp => resp.json());
};

const getCurrentUserData = id => {
    return fetch(`${API_ROOT}/users/${id}`, {
      headers: headers()
    }).then(resp => {
      return resp.json();
    });
}


export const api = {
    auth: {
        login,
        getCurrentUser,
    },
    matchedUsers: {
        getMatchingUsersFromGreatest,
        getMatchingUsersFromLeast,
    },
    createUser: {
        signup,
    },
    getUserData: {
        getCurrentUserData
    }
}
