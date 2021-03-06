import React from "react";

//connecting enzyme

//shallow - is one of the best of way to render components - it is rendering the component with all
// its content but content is not deeply rendered. so nagation items has everything rendeered but navigation item component
//it is not going to be rendered to deep - sense of unity tests
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

//connected
configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  //actual test is going here
  //it allow to write one individual test
  it("should render two <NAvigationItems /> elements if not authenticated", () => {
    //we want to create here the instance of this component in a way like it would be rendered inside the browser
    //ENZYMe - allowing us to render the single component

    //expectation

    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NAvigationItems /> elements if  authenticated", () => {
    // wrapper = shallow(<NavigationItem isAuthenticated/>);
    wrapper.setProps({ isAuthenticated: true });

    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should an exact logout button", () => {
    // wrapper = shallow(<NavigationItem isAuthenticated/>);
    wrapper.setProps({ isAuthenticated: true });

    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
