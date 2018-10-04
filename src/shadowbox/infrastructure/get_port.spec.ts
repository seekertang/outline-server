// Copyright 2018 The Outline Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as get_port from './get_port';

describe('PortProvider', () => {
  describe('addReservedPort', () => {
    it('gets port over 1023', async (done) => {
      expect(await new get_port.PortProvider().reserveNewPort()).toBeGreaterThan(1023);
      done();
    });
    it('fails on double reservation', (done) => {
      const ports = new get_port.PortProvider();
      ports.addReservedPort(8080);
      expect(() => ports.addReservedPort(8080)).toThrowError();
      done();
    });
  });
  describe('freePort', () => {
    it('makes port available', (done) => {
      const ports = new get_port.PortProvider();
      ports.addReservedPort(8080);
      ports.freePort(8080);
      ports.addReservedPort(8080);
      done();
    });
  });
});