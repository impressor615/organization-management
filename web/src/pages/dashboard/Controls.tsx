import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, PureComponent } from "React";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import { ConnectProps, DispatchResult } from "@/@types/types";
import { createUser } from "@/actions";
import { StateInterface } from "@/reducers";

interface SearchProps {
  type: string;
  search: string;
  onChange(e: React.ChangeEvent): void;
  onSubmit(e: React.FormEvent): void;
}

const Search = ({
  search,
  onChange,
  onSubmit,
}: SearchProps) => (
  <Form
    className="dashboard-search"
    onSubmit={onSubmit}
  >
    <FormGroup>
      <InputGroup>
        <Input
          id="search"
          type="text"
          placeholder="직원 검색"
          onChange={onChange}
          value={search}
        />
        <InputGroupAddon addonType="append">
          <Button type="submit" color="primary">
            <FontAwesomeIcon icon="search" size="lg" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </FormGroup>
  </Form>
);

interface TypeDropdownProps {
  isOpen: boolean;
  type: string;
  onToggle(): void;
  onClick(data: object): () => void;
}

const TypeDropdown = ({
  type,
  isOpen,
  onToggle,
  onClick,
}: TypeDropdownProps) => (
  <FormGroup>
    <Dropdown isOpen={isOpen} toggle={onToggle}>
      <DropdownToggle caret color="light">
        {
          type === "list"
            ? "리스트로 보기"
            : "트리구조로 보기"
        }
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          onClick={onClick({ value: "list" })}
          active={type === "list"}
        >
          리스트로 보기
        </DropdownItem>
        <DropdownItem
          onClick={onClick({ value: "tree" })}
          active={type === "tree"}
        >
          트리구조로 보기
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </FormGroup>
);

interface AddMemberProps {
  isOpen: boolean;
  name: string;
  position: string;
  phone: string;
  email: string;
  onToggle(): void;
  onClosed(): void;
  onChange(e: React.ChangeEvent): void;
  onSubmit(e: React.FormEvent): void;
}

const AddMember = ({
  isOpen,
  name,
  position,
  phone,
  email,
  onToggle,
  onClosed,
  onChange,
  onSubmit,
}: AddMemberProps) => (
  <Fragment>
    <button
      type="button"
      className="btn add-member-wrapper"
      onClick={onToggle}
    >
      <FontAwesomeIcon icon="user" size="lg" />
      <span>&#43;</span>
    </button>
    <Modal
      isOpen={isOpen}
      toggle={onToggle}
      onClosed={onClosed}
    >
      <ModalHeader toggle={onToggle}>구성원 추가</ModalHeader>
      <Form onSubmit={onSubmit}>
        <ModalBody>
          <FormGroup>
            <Label>이름</Label>
            <Input id="name" type="text" placeholder="이름 입력" onChange={onChange} value={name} />
          </FormGroup>
          <FormGroup>
            <Label>직책</Label>
            <Input id="position" type="text" placeholder="직책 입력" onChange={onChange} value={position} />
          </FormGroup>
          <FormGroup>
            <Label>연락처</Label>
            <Input id="phone" type="tel" placeholder="연락처 입력" onChange={onChange} value={phone} />
          </FormGroup>
          <FormGroup>
            <Label>이메일</Label>
            <Input id="email" type="email" placeholder="이메일 입력" onChange={onChange} value={email} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">확인</Button>
          <Button color="secondary" onClick={onToggle}>취소</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </Fragment>
);

interface States {
  isOpen: boolean;
  isModalOpen: boolean;
  type: string;
  search: string;
  name: string;
  position: string;
  phone: string;
  email: string;
}

class Controls extends PureComponent<ConnectProps, States> {
  public state = {
    email: "",
    isModalOpen: false,
    isOpen: false,
    name: "",
    phone: "",
    position: "",
    search: "",
    type: "list",
  };

  public render() {
    const {
      isOpen,
      name,
      phone,
      position,
      email,
      type,
      search,
      isModalOpen,
    } = this.state;
    return (
      <div className="dashboard-controls">
        <TypeDropdown
          isOpen={isOpen}
          type={type}
          onClick={this.onDdClick}
          onToggle={this.onDdToggle}
        />
        <div className="dashboard-controls-wrapper">
          <Search
            type={type}
            search={search}
            onChange={this.onChange}
            onSubmit={this.onSearchSubmit}
          />
          <AddMember
            isOpen={isModalOpen}
            name={name}
            phone={phone}
            position={position}
            email={email}
            onChange={this.onChange}
            onToggle={this.onModalToggle}
            onClosed={this.onModalClosed}
            onSubmit={this.onAddMemberSubmit}
          />
        </div>
      </div>
    );
  }

  private onDdToggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  private onDdClick = (data: { value: string }) => () => {
    this.setState({ type: data.value });
  }

  private onChange = (e: React.ChangeEvent) => {
    e.stopPropagation();
    const { id, value }: any = e.target;
    this.setState({
      [id]: value,
    } as Pick<States, keyof States>);
  }

  private onModalToggle = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  }

  private onModalClosed = () => {
    this.setState({
      email: "",
      name: "",
      phone: "",
      position: "",
    });
  }

  private onAddMemberSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // TODO: need to add department_id
    const { dispatch } = this.props;
    const {
      name,
      position,
      phone,
      email,
    } = this.state;

    await dispatch(createUser({
      email, name, phone, position,
    }));
  }

  // TODO: need to write code for search submitting
  private onSearchSubmit = (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const { search } = this.state;
  }
}

const mapStateToProps = (state: StateInterface) => ({

});
export default withRouter(connect(mapStateToProps)(Controls) as any);
