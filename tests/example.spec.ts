import { test as _test, expect, APIRequestContext } from '@playwright/test';

class MyAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async newOnboardingCompany() {
    const resp = await this.request.post('http://localhost:4747',{ data: { name: 'foo' }});
    const {id } = await resp.json()
    return id;
  }
}

const test = _test.extend<{ myAPI: MyAPI }>({
  myAPI: async ({ request }, use) => {
    await use(new MyAPI(request));
  }
});

let companyId;
let linkedCompanyId;

test.beforeAll(async ({ myAPI }) => {
  companyId = await myAPI.newOnboardingCompany();
  linkedCompanyId = await myAPI.newOnboardingCompany();
});

test('we have two new ids', () => {
  console.log('companyId', companyId);
  console.log('linkedCompanyId', linkedCompanyId);
  expect(companyId && linkedCompanyId && companyId !== linkedCompanyId);
});
