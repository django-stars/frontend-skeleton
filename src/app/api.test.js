import API, { configure } from 'api';
const api = API('endpoint');

describe('check all functions on fetch success', () => {
    let response;

    beforeEach(() => {
        let data = { id: 123 };

        configure({getState: () => {
            return {session: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
            }}
        }})

        window.fetch = jest.fn(() => {
            return Promise.resolve({
                headers: {
                    get: () => {
                        return 'application/json'
                    }
                },
                ok: true,
                json: () => Promise.resolve(data)
             })
         })
    });

    afterEach(() => {
        expect(window.fetch).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.id).toBe(123);
    });

    it('postAsFormData', async () => {
        response = await api.postAsFormData('foo');
    });

    it('patchAsFormData', async() => {
        response = await api.patchAsFormData('foo');
    });

    it('post', async() => {
        response = await api.post('foo');
    });

    it('delete', async() => {
        response = await api.delete('foo');
    });

    it('patch', async() => {
        response = await api.patch('foo');
    });

    it('put', async() => {
        response = await api.put('foo');
    });

    it('get', async() => {
        response = await api.get();
    });
});

describe('if response.headers Content-Type !== application/json', () => {
    let response;

    beforeEach(() => {
        let data = { id: 123 };

        configure({getState: () => {
            return {session: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
            }}
        }})

        window.fetch = jest.fn(() => {
            return Promise.resolve({
                headers: {
                    get: () => {
                        return 'multipart/form-data'
                    }
                },
                ok: true,
                json: () => Promise.resolve(data)
             })
         })
    });

    afterEach(() => {
        expect(response).not.toBeNull();
    });

    it('postAsFormData', async () => {
        response = await api.postAsFormData();
    });

    it('patchAsFormData', async() => {
        response = await api.patchAsFormData();
    });

    it('post', async() => {
        response = await api.post();
    });

    it('delete', async() => {
        response = await api.delete();
    });

    it('patch', async() => {
        response = await api.patch();
    });

    it('put', async() => {
        response = await api.put();
    });

    it('get', async() => {
        response = await api.get();
    });
});
