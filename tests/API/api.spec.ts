import { expect, test } from "@playwright/test"

test('Get user', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/users/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(JSON.stringify(body, null, 2));
})

test('Create User', async ({ request }) => {
    const payload = {
        firstName: "Tousif786",
        lastName: "Sayani",
        age: 25
    }
    const response = await request.post('https://dummyjson.com/users/add', {
        data: payload
    });
    console.log(payload);
    expect(response.status()).toBe(201);
    const body = await response.json();
    console.log(JSON.stringify(body, null, 2));
})

test('Update User', async ({ request }) => {
    const payload = {
        firstName: "Tousif007"
    }
    const response = await request.put("https://dummyjson.com/users/1", {
        data: payload
    })
    console.log(payload);
    expect(response.status()).toBe(200)
    const body = await response.json();
    console.log(JSON.stringify(body, null, 2))
})

test('Delete User', async ({ request }) => {
    const response = await request.delete('https://dummyjson.com/users/1')
    expect(response.status()).toBe(200)
    const body = await response.json();
    console.log(JSON.stringify(body, null, 2))
})

test('Get Current user', async ({ request }) => {
    const payload = {
        username: "emilys",
        password: "emilyspass"
    }

    const loginResponse = await request.post("https://dummyjson.com/auth/login", {
        data: payload
    })

    console.log(payload)
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    console.log(JSON.stringify(loginBody, null, 2))
    const token = await loginBody.accessToken;


    const response = await request.get('https://dummyjson.com/auth/me', {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })

    expect(response.status()).toBe(200)
    const body = await response.json();
    console.log(JSON.stringify(body, null, 2))
})



test("Get Current User1", async ({ request }) => {

    // Login API
    const loginResponse = await request.post(
        "https://dummyjson.com/auth/login",
        {
            data: {
                username: "emilys",
                password: "emilyspass"
            }
        }
    );

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    const token = loginBody.accessToken;

    // Protected API
    const response = await request.get(
        "https://dummyjson.com/auth/me",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.username).toBe("emilys");

});