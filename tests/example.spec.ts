import { test, expect, Page } from '@playwright/test';

let companyId;
let linkedCompanyId;

test.beforeAll(async ({ request }) => {
  const createNewCompany = async () => {
    const resp = await request.post('http://localhost:4747', {
      data: {
        ts: new Date(),
      }
    });
    const { id } = await resp.json()
    return id;
  }

  companyId = await createNewCompany();
  linkedCompanyId = await createNewCompany();
});

test('we have two new ids', () => {
  console.log('companyId', companyId);
  console.log('linkedCompanyId', linkedCompanyId);
  expect(companyId && linkedCompanyId && companyId !== linkedCompanyId);
});
