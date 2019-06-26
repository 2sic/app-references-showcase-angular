import { TestBed } from '@angular/core/testing';

import { CategoryFilterService } from './category-filter.service';

describe('CategoryFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryFilterService = TestBed.get(CategoryFilterService);
    expect(service).toBeTruthy();
  });
});
